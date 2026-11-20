'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Button } from './components';
import styles from './motion-patterns.module.css';

const easeOut = [0.23, 1, 0.32, 1] as const;
const easeInOut = [0.77, 0, 0.175, 1] as const;

export function MotionShowcase({
  playLabel,
  replayLabel,
  gridLabel,
  listLabel,
  items
}: {
  playLabel: string;
  replayLabel: string;
  gridLabel: string;
  listLabel: string;
  items: [string, string, string];
}) {
  const reduceMotion = useReducedMotion();
  const [motionPreference, setMotionPreference] = useState<
    'pending' | 'reduce' | 'no-preference'
  >('pending');
  const [run, setRun] = useState(0);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () =>
      setMotionPreference(preference.matches ? 'reduce' : 'no-preference');

    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  return (
    <div className={styles.motionDemo}>
      <div
        aria-label="Motion layout controls"
        className={styles.controls}
        role="group"
      >
        <Button
          aria-pressed={layout === 'grid'}
          onClick={() => setLayout('grid')}
          type="button"
          variant={layout === 'grid' ? 'primary' : 'secondary'}
        >
          {gridLabel}
        </Button>
        <Button
          aria-pressed={layout === 'list'}
          onClick={() => setLayout('list')}
          type="button"
          variant={layout === 'list' ? 'primary' : 'secondary'}
        >
          {listLabel}
        </Button>
        <Button
          onClick={() => setRun((current) => current + 1)}
          type="button"
          variant="secondary"
        >
          {run === 0 ? playLabel : replayLabel}
        </Button>
      </div>
      <motion.div
        className={styles.motionGrid}
        data-layout={layout}
        layout={!reduceMotion}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.22, ease: easeInOut }
        }
      >
        {items.map((item, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={styles.motionItem}
            initial={run > 0 && !reduceMotion ? { opacity: 0.65, y: 5 } : false}
            key={`${item}-${run}`}
            layout={!reduceMotion}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.18,
                    delay: run > 0 ? index * 0.06 : 0,
                    ease: easeOut
                  }
            }
          >
            <span className={styles.motionNumber}>0{index + 1}</span>
            <span>{item}</span>
          </motion.div>
        ))}
      </motion.div>
      <p className={styles.motionNote}>
        {motionPreference === 'pending'
          ? 'prefers-reduced-motion: checking'
          : `prefers-reduced-motion: ${motionPreference}`}
      </p>
    </div>
  );
}
