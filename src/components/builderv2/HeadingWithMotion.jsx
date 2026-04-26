import React from 'react';
import { motion, useInView } from 'framer-motion';

export default function HeadingWithMotion({ element, props, textStyles, wrapperStyles, content }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: props.motion?.entrance?.once !== false });
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const motionEnabled = props.motion?.enabled && !prefersReducedMotion;

  // Entrance Animation Variants
  const getEntranceVariants = () => {
    if (!motionEnabled || !props.motion?.entrance?.preset || props.motion.entrance.preset === 'none') return {};
    
    const preset = props.motion.entrance.preset;
    
    const variants = {
      fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
      fadeUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
      fadeDown: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } },
      fadeLeft: { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
      fadeRight: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
      zoom: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
      zoomUp: { initial: { opacity: 0, scale: 0.8, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 } },
      slideUp: { initial: { y: 40 }, animate: { y: 0 } },
      slideDown: { initial: { y: -40 }, animate: { y: 0 } },
    };
    
    return variants[preset] || {};
  };

  const entranceVariants = getEntranceVariants();
  const hasEntranceAnimation = motionEnabled && entranceVariants.initial;

  // Mouse Effects
  React.useEffect(() => {
    if (!motionEnabled || !props.motion?.mouse?.enabled || props.motion.mouse.type === 'none') return;
    
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };
    
    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };
    
    const el = ref.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [motionEnabled, props.motion?.mouse?.enabled, props.motion?.mouse?.type]);

  const getMouseTransform = () => {
    if (!motionEnabled || !props.motion?.mouse?.enabled || props.motion.mouse.type === 'none') return {};
    
    const intensity = props.motion.mouse.intensity || 0.2;
    const type = props.motion.mouse.type;
    
    if (type === 'tilt') {
      return {
        transform: `rotateY(${mousePos.x * intensity * 10}deg) rotateX(${-mousePos.y * intensity * 10}deg)`,
        transition: 'transform 0.2s ease-out'
      };
    }
    if (type === 'magnetic') {
      return {
        transform: `translate(${mousePos.x * intensity * 20}px, ${mousePos.y * intensity * 20}px)`,
        transition: 'transform 0.2s ease-out'
      };
    }
    if (type === 'hoverGrow') {
      const isHovered = mousePos.x !== 0 || mousePos.y !== 0;
      return {
        transform: isHovered ? `scale(${1 + intensity * 0.5})` : 'scale(1)',
        transition: 'transform 0.2s ease-out'
      };
    }
    return {};
  };

  const mouseStyles = getMouseTransform();

  // Sticky positioning
  const finalWrapperStyles = { ...wrapperStyles };
  if (motionEnabled && props.motion?.sticky?.enabled && props.motion.sticky.mode === 'top') {
    finalWrapperStyles.position = 'sticky';
    finalWrapperStyles.top = `${props.motion.sticky.offsetPx || 0}px`;
    finalWrapperStyles.zIndex = props.motion.sticky.zIndex || 10;
  }

  // Wrapper component - Motion or regular div
  const WrapperComponent = hasEntranceAnimation ? motion.div : 'div';
  const motionProps = hasEntranceAnimation ? {
    ref,
    initial: entranceVariants.initial,
    animate: isInView ? entranceVariants.animate : entranceVariants.initial,
    transition: { 
      duration: (props.motion.entrance.durationMs || 400) / 1000, 
      delay: (props.motion.entrance.delayMs || 0) / 1000 
    }
  } : { ref };

  return (
    <WrapperComponent
      {...motionProps}
      id={props.elementId || undefined}
      className={props.cssClasses || undefined}
      style={{ ...finalWrapperStyles, ...mouseStyles }}
    >
      {props.headingBox && props.backgroundMode === 'image' && props.overlayColor && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: props.overlayColor,
          opacity: (props.overlayOpacity || 0) / 100,
          borderRadius: `${props.borderRadius || 0}px`,
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {content}
      </div>
      {props.customCSS && (
        <style>{`
          #${props.elementId || `heading-${element.id}`} {
            ${props.customCSS}
          }
        `}</style>
      )}
    </WrapperComponent>
  );
}