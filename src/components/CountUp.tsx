import { useEffect, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 2, 
  delay = 0,
  decimals = 0,
  suffix = '',
  prefix = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animateCount = () => {
      let startTime: number | null = null;
      const startValue = 0;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = (currentTime - startTime) / 1000; // em segundos
        
        if (elapsed < duration) {
          const progress = elapsed / duration;
          // Easing function (ease-out)
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = startValue + (end - startValue) * easeOut;
          setDisplayValue(currentValue);
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(end);
        }
      };

      requestAnimationFrame(animate);
    };

    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        animateCount();
      }, delay * 1000);
      return () => clearTimeout(delayTimer);
    } else {
      animateCount();
    }
  }, [end, duration, delay]);

  const formattedValue = displayValue.toFixed(decimals);

  return (
    <span>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

export default CountUp;
