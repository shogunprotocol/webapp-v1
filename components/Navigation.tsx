'use client'
import { createContext, useContext, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

const NavigationContext = createContext<{
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}>({
  activeIndex: 0,
  setActiveIndex: () => {},
});

export function Navigation({
  children,
  as: Component = 'div',
  className,
}: {
  children: (props: {
    ready: boolean;
    size: number;
    position: number;
    duration: number;
  }) => React.ReactNode;
  as?: any;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState(0);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(300);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        const { width, left } = activeElement.getBoundingClientRect();
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        setSize(width);
        setPosition(left - containerLeft);
        setReady(true);
      }
    }
  }, [activeIndex]);

  return (
    <NavigationContext.Provider value={{ activeIndex, setActiveIndex }}>
      <Component ref={containerRef} className={className}>
        {children({ ready, size, position, duration })}
      </Component>
    </NavigationContext.Provider>
  );
}

Navigation.List = function NavigationList({
  children,
  as: Component = 'div',
  className,
}: {
  children: React.ReactNode;
  as?: any;
  className?: string;
}) {
  return <Component className={className}>{children}</Component>;
};

Navigation.Item = function NavigationItem({
  children,
  as: Component = 'div',
  onActivated,
}: {
  children: (props: { setActive: () => void; isActive: boolean }) => React.ReactNode;
  as?: any;
  onActivated?: () => void;
}) {
  const { activeIndex, setActiveIndex } = useContext(NavigationContext);
  const index = useRef(0);
  const isActive = activeIndex === index.current;

  return (
    <Component data-active={isActive}>
      {children({
        setActive: () => {
          setActiveIndex(index.current);
          onActivated?.();
        },
        isActive,
      })}
    </Component>
  );
}; 