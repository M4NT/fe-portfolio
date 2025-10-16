<?php
/**
 * API de Envio de Email - Portfolio Yan.M
 * 
 * Endpoint para processar formulário de contato
 * Configuração: Atualize as variáveis abaixo com suas informações
 */

// Configurações de CORS (permite requisições do frontend)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

// Responde OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Apenas aceita POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido. Use POST.'
    ]);
    exit();
}

// ========================================
// CONFIGURAÇÕES - ATUALIZE AQUI
// ========================================

// Email que receberá as mensagens
define('RECIPIENT_EMAIL', 'hi@yanmantovani.com');

// Nome do remetente (seu nome/empresa)
define('RECIPIENT_NAME', 'Yan.M Portfolio');

// Assunto padrão dos emails
define('EMAIL_SUBJECT_PREFIX', '[Portfolio] Novo Contato');

// Configurações de segurança
define('MAX_MESSAGE_LENGTH', 5000);
define('RATE_LIMIT_SECONDS', 60); // 1 minuto entre envios do mesmo IP

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Valida email
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Sanitiza string
 */
function sanitizeString($string) {
    return htmlspecialchars(strip_tags(trim($string)), ENT_QUOTES, 'UTF-8');
}

/**
 * Rate limiting simples (previne spam)
 */
function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'];
    $file = sys_get_temp_dir() . '/contact_' . md5($ip) . '.txt';
    
    if (file_exists($file)) {
        $lastTime = (int)file_get_contents($file);
        if (time() - $lastTime < RATE_LIMIT_SECONDS) {
            return false;
        }
    }
    
    file_put_contents($file, time());
    return true;
}

/**
 * Log de erros
 */
function logError($message) {
    error_log('[Contact Form] ' . $message);
}

// ========================================
// PROCESSAMENTO
// ========================================

try {
    // Rate limiting
    if (!checkRateLimit()) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Muitas tentativas. Aguarde 1 minuto e tente novamente.'
        ]);
        exit();
    }

    // Lê dados JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        throw new Exception('Dados inválidos');
    }

    // Extrai e valida campos
    $name = isset($data['name']) ? sanitizeString($data['name']) : '';
    $email = isset($data['email']) ? sanitizeString($data['email']) : '';
    $subject = isset($data['subject']) ? sanitizeString($data['subject']) : '';
    $message = isset($data['message']) ? sanitizeString($data['message']) : '';

    // Validações
    $errors = [];

    if (empty($name) || strlen($name) < 2) {
        $errors[] = 'Nome inválido';
    }

    if (empty($email) || !isValidEmail($email)) {
        $errors[] = 'Email inválido';
    }

    if (empty($subject) || strlen($subject) < 5) {
        $errors[] = 'Assunto muito curto';
    }

    if (empty($message) || strlen($message) < 20) {
        $errors[] = 'Mensagem muito curta';
    }

    if (strlen($message) > MAX_MESSAGE_LENGTH) {
        $errors[] = 'Mensagem muito longa';
    }

    // Se houver erros, retorna
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Erro de validação',
            'errors' => $errors
        ]);
        exit();
    }

    // ========================================
    // PREPARA EMAIL
    // ========================================

    $emailSubject = EMAIL_SUBJECT_PREFIX . ': ' . $subject;
    
    // Corpo do email em HTML
    $emailBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
            .value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2 style='margin: 0;'>📧 Novo Contato do Portfolio</h2>
                <p style='margin: 10px 0 0 0; opacity: 0.9;'>Você recebeu uma nova mensagem!</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>👤 Nome:</div>
                    <div class='value'>" . htmlspecialchars($name) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>📧 Email:</div>
                    <div class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></div>
                </div>
                
                <div class='field'>
                    <div class='label'>📋 Assunto:</div>
                    <div class='value'>" . htmlspecialchars($subject) . "</div>
                </div>
                
                <div class='field'>
                    <div class='label'>💬 Mensagem:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
                
                <div class='footer'>
                    <p>📅 Enviado em: " . date('d/m/Y H:i:s') . "</p>
                    <p>🌐 IP: " . $_SERVER['REMOTE_ADDR'] . "</p>
                    <p>Yan.M Portfolio - Sistema de Contato</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";

    // Versão texto plano (fallback)
    $emailBodyPlain = "
Novo Contato do Portfolio
========================

Nome: $name
Email: $email
Assunto: $subject

Mensagem:
$message

---
Enviado em: " . date('d/m/Y H:i:s') . "
IP: " . $_SERVER['REMOTE_ADDR'] . "
    ";

    // Headers do email
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . RECIPIENT_NAME . ' <noreply@' . $_SERVER['HTTP_HOST'] . '>',
        'Reply-To: ' . $name . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1',
        'Importance: High'
    ];

    // ========================================
    // ENVIA EMAIL
    // ========================================

    $sent = mail(
        RECIPIENT_EMAIL,
        $emailSubject,
        $emailBody,
        implode("\r\n", $headers)
    );

    if (!$sent) {
        throw new Exception('Falha ao enviar email');
    }

    // ========================================
    // LOG DE SUCESSO (opcional)
    // ========================================
    
    $logFile = __DIR__ . '/../../logs/contact.log';
    $logDir = dirname($logFile);
    
    if (!is_dir($logDir)) {
        @mkdir($logDir, 0755, true);
    }
    
    if (is_writable($logDir)) {
        $logEntry = date('[Y-m-d H:i:s]') . " Contato de: $name ($email) - Assunto: $subject\n";
        @file_put_contents($logFile, $logEntry, FILE_APPEND);
    }

    // ========================================
    // RESPOSTA DE SUCESSO
    // ========================================

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Mensagem enviada com sucesso! Responderei em breve.'
    ]);

} catch (Exception $e) {
    // Log do erro
    logError($e->getMessage());
    
    // Resposta de erro
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao enviar mensagem. Tente novamente mais tarde.'
    ]);
}
?>

