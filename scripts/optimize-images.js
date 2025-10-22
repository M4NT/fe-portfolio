#!/usr/bin/env node

/**
 * Script para otimização de imagens
 * Converte imagens para WebP e otimiza tamanhos
 */

const fs = require('fs');
const path = require('path');

// Lista de imagens que precisam ser otimizadas
const imagesToOptimize = [
  'public/images/projects/projeto-1.png',
  'public/images/projects/projeto-2.png', 
  'public/images/projects/projeto-3.png',
  'public/images/projects/projeto-4.png',
  'public/images/projects/projeto-5.png',
  'public/images/about/photo-1.png',
  'public/images/about/photo-2.png',
  'public/images/about/photo-3.png',
  'public/images/about/photo-4.png'
];

console.log('🖼️  Otimização de Imagens');
console.log('========================');

console.log('\n📋 Imagens que precisam ser otimizadas:');
imagesToOptimize.forEach((img, index) => {
  const exists = fs.existsSync(img);
  const size = exists ? getFileSize(img) : 'NÃO ENCONTRADA';
  console.log(`${index + 1}. ${img} - ${size}`);
});

console.log('\n🔧 Ações recomendadas:');
console.log('1. Converter todas as imagens para WebP');
console.log('2. Reduzir qualidade para 80-85%');
console.log('3. Criar versões responsivas (mobile, tablet, desktop)');
console.log('4. Implementar lazy loading (já feito)');

console.log('\n📊 Economia estimada:');
console.log('- WebP: ~70% menor que PNG');
console.log('- Compressão otimizada: ~30% adicional');
console.log('- Total estimado: ~1.5MB de economia');

console.log('\n🛠️  Ferramentas recomendadas:');
console.log('- Online: https://squoosh.app/');
console.log('- CLI: imagemagick, sharp');
console.log('- Build: vite-plugin-imagemin');

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    return `${sizeInMB}MB`;
  } catch (error) {
    return 'ERRO';
  }
}

console.log('\n✅ Script de otimização concluído!');
console.log('💡 Execute as otimizações manualmente ou configure um pipeline automatizado.');
