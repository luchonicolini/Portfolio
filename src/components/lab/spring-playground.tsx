'use client';

import { useState, useCallback, useId } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Play, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';
import {
  SPRING_PHYSICS_DEFAULTS,
  generateMotionSpringSnippet,
  clamp,
  type SpringPhysicsConfig
} from '@/data/lab';
import styles from './motion.module.css';

interface SpringPlaygroundProps {
  locale?: string;
}

export function SpringPlayground({ locale = 'es' }: SpringPlaygroundProps) {
  const isEs = locale === 'es';
  const shouldReduceMotion = useReducedMotion();

  // Spring parameters state
  const [stiffness, setStiffness] = useState<number>(
    SPRING_PHYSICS_DEFAULTS.stiffness
  );
  const [damping, setDamping] = useState<number>(
    SPRING_PHYSICS_DEFAULTS.damping
  );
  const [mass, setMass] = useState<number>(SPRING_PHYSICS_DEFAULTS.mass);

  // Animation trigger key & copy feedback state
  const [triggerKey, setTriggerKey] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Unique IDs for accessible form controls
  const stiffnessId = useId();
  const dampingId = useId();
  const massId = useId();

  // Handlers
  const handleStiffnessChange = (val: number) => {
    setStiffness(clamp(val, 50, 500));
  };

  const handleDampingChange = (val: number) => {
    setDamping(clamp(val, 5, 50));
  };

  const handleMassChange = (val: number) => {
    // Preserve 1 decimal place precision
    setMass(Math.round(clamp(val, 0.2, 5.0) * 10) / 10);
  };

  const handleTrigger = useCallback(() => {
    setTriggerKey((k) => k + 1);
  }, []);

  const handleReset = useCallback(() => {
    setStiffness(SPRING_PHYSICS_DEFAULTS.stiffness);
    setDamping(SPRING_PHYSICS_DEFAULTS.damping);
    setMass(SPRING_PHYSICS_DEFAULTS.mass);
    setTriggerKey((k) => k + 1);
  }, []);

  const currentConfig: SpringPhysicsConfig = {
    stiffness,
    damping,
    mass
  };

  const codeSnippet = generateMotionSpringSnippet(currentConfig);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Graceful fallback for non-secure contexts
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [codeSnippet]);

  return (
    <section
      id="spring-physics"
      aria-labelledby="spring-playground-title"
      className={styles.playgroundContainer}
    >
      {/* Header */}
      <header className={styles.header}>
        <p className={styles.eyebrow}>02 / MOTION ENGINEERING</p>
        <h2 id="spring-playground-title" className={styles.title}>
          {isEs ? 'Física de Resortes con Motion' : 'Spring Physics Playground'}
        </h2>
        <p className={styles.description}>
          {isEs
            ? 'Explorá tensión, fricción y masa en tiempo real. Ajustá los parámetros para comprender cómo la inercia y el amortiguamiento definen el ritmo del movimiento natural en la interfaz.'
            : 'Explore stiffness, damping, and mass in real-time. Adjust dynamics to understand how inertia and oscillation settling shape organic neo-brutalist interaction rhythm.'}
        </p>
      </header>

      {/* Main Grid: Controls + Interactive Stage */}
      <div className={styles.mainGrid}>
        {/* Controls Panel */}
        <div className={styles.controlsPanel}>
          <div className={styles.panelTitle}>
            <span>{isEs ? 'PARÁMETROS FÍSICOS' : 'PHYSICAL PARAMETERS'}</span>
            <span className={styles.categoryBadge}>MOTION/REACT</span>
          </div>

          {/* Stiffness Slider */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <label htmlFor={stiffnessId} className={styles.controlLabel}>
                {isEs ? 'Rigidez (Stiffness / k)' : 'Stiffness (k)'}
              </label>
              <span className={styles.valueBadge} aria-label={`${stiffness}`}>
                {stiffness}
              </span>
            </div>
            <p className={styles.sliderHelp}>
              {isEs
                ? 'Tensión del resorte (50–500). Mayor tensión = respuesta más rápida y energética.'
                : 'Spring tension (50–500). Higher tension = snappier, higher frequency oscillations.'}
            </p>
            <input
              id={stiffnessId}
              type="range"
              min="50"
              max="500"
              step="10"
              value={stiffness}
              onChange={(e) => handleStiffnessChange(Number(e.target.value))}
              className={styles.sliderInput}
              aria-valuemin={50}
              aria-valuemax={500}
              aria-valuenow={stiffness}
              aria-label={isEs ? 'Ajustar rigidez' : 'Adjust stiffness'}
            />
          </div>

          {/* Damping Slider */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <label htmlFor={dampingId} className={styles.controlLabel}>
                {isEs ? 'Amortiguación (Damping / c)' : 'Damping (c)'}
              </label>
              <span className={styles.valueBadge} aria-label={`${damping}`}>
                {damping}
              </span>
            </div>
            <p className={styles.sliderHelp}>
              {isEs
                ? 'Fricción que disipa el rebote (5–50). Menor valor = más oscilaciones.'
                : 'Friction that dissipates bounce (5–50). Lower values = more elastic ringing.'}
            </p>
            <input
              id={dampingId}
              type="range"
              min="5"
              max="50"
              step="1"
              value={damping}
              onChange={(e) => handleDampingChange(Number(e.target.value))}
              className={styles.sliderInput}
              aria-valuemin={5}
              aria-valuemax={50}
              aria-valuenow={damping}
              aria-label={isEs ? 'Ajustar amortiguación' : 'Adjust damping'}
            />
          </div>

          {/* Mass Slider */}
          <div className={styles.controlGroup}>
            <div className={styles.controlHeader}>
              <label htmlFor={massId} className={styles.controlLabel}>
                {isEs ? 'Masa (Mass / m)' : 'Mass (m)'}
              </label>
              <span
                className={styles.valueBadge}
                aria-label={`${mass.toFixed(1)}`}
              >
                {mass.toFixed(1)}
              </span>
            </div>
            <p className={styles.sliderHelp}>
              {isEs
                ? 'Inercia del cuerpo (0.2–5.0). Mayor masa = aceleración y frenado más pesados.'
                : 'Body inertia (0.2–5.0). Higher mass = heavier momentum and longer periods.'}
            </p>
            <input
              id={massId}
              type="range"
              min="0.2"
              max="5.0"
              step="0.1"
              value={mass}
              onChange={(e) => handleMassChange(Number(e.target.value))}
              className={styles.sliderInput}
              aria-valuemin={0.2}
              aria-valuemax={5.0}
              aria-valuenow={mass}
              aria-label={isEs ? 'Ajustar masa' : 'Adjust mass'}
            />
          </div>

          {/* Actions Toolbar */}
          <div
            className={styles.toolbar}
            role="toolbar"
            aria-label={isEs ? 'Acciones' : 'Actions'}
          >
            <button
              type="button"
              onClick={handleTrigger}
              className={styles.btnPrimary}
              aria-label={
                isEs
                  ? 'Disparar animación de resorte'
                  : 'Trigger spring animation'
              }
            >
              <Play size={16} aria-hidden="true" />
              <span>
                {isEs
                  ? 'Disparar animación de resorte'
                  : 'Trigger spring animation'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={styles.btnSecondary}
              aria-label={
                isEs
                  ? 'Restablecer valores por defecto'
                  : 'Reset to default values'
              }
            >
              <RotateCcw size={16} aria-hidden="true" />
              <span>
                {isEs
                  ? 'Restablecer valores por defecto'
                  : 'Reset to default values'}
              </span>
            </button>
          </div>
        </div>

        {/* Interactive Sandbox Stage */}
        <div className={styles.stageContainer}>
          <div className={styles.stageHeader}>
            <h3 className={styles.stageTitle}>
              {isEs ? 'ESCENARIO INTERACTIVO' : 'INTERACTIVE STAGE'}
            </h3>
            <span
              className={`${styles.reducedMotionBadge} ${
                shouldReduceMotion ? styles.reducedMotionBadgeActive : ''
              }`}
            >
              {shouldReduceMotion
                ? isEs
                  ? 'Reducción de movimiento: Activada'
                  : 'Reduced Motion: Active'
                : isEs
                  ? 'Física Activa'
                  : 'Physics Active'}
            </span>
          </div>

          <div className={styles.stageCanvas}>
            <motion.div
              key={triggerKey}
              role="button"
              tabIndex={0}
              aria-label={
                isEs
                  ? 'Objeto neobrutalista interactivo'
                  : 'Interactive neo-brutalist object'
              }
              onClick={handleTrigger}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTrigger();
                }
              }}
              className={styles.springBox}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { scale: [1.2, 1], rotate: [6, 0] }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.2, ease: 'easeOut' }
                  : {
                      type: 'spring',
                      stiffness,
                      damping,
                      mass
                    }
              }
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
            >
              <Sparkles size={28} aria-hidden="true" />
              <span className={styles.springBoxTitle}>
                {isEs
                  ? 'Objeto neobrutalista interactivo'
                  : 'Interactive neo-brutalist object'}
              </span>
            </motion.div>
            <span className={styles.springBoxHint} aria-hidden="true">
              {isEs ? 'CLIC / ENTER' : 'CLICK / ENTER'}
            </span>
          </div>
        </div>
      </div>

      {/* Concise Explanation Cards: Stiffness, Damping, Mass */}
      <div
        className={styles.explanationGrid}
        aria-label={
          isEs ? 'Conceptos de física de resortes' : 'Spring physics concepts'
        }
      >
        {/* Stiffness Card */}
        <article className={styles.explanationCard}>
          <span
            className={`${styles.explanationBadge} ${styles.badgeStiffness}`}
          >
            k = Hooke
          </span>
          <h4 className={styles.explanationTitle}>
            {isEs ? 'Rigidez (Stiffness)' : 'Stiffness (k)'}
          </h4>
          <p className={styles.explanationFormula}>F = -k · Δx</p>
          <p className={styles.explanationText}>
            {isEs
              ? 'Controla la fuerza restauradora del resorte hacia el estado objetivo. Valores altos (k > 300) generan microinteracciones hiperreactivas e inmediatas; valores bajos (k < 150) producen una respuesta suave y elástica.'
              : 'Controls the restoring force pulling back to target. High values (k > 300) produce snappy, immediate reactions; lower values (k < 150) generate gentle, fluid elastic motion.'}
          </p>
        </article>

        {/* Damping Card */}
        <article className={styles.explanationCard}>
          <span className={`${styles.explanationBadge} ${styles.badgeDamping}`}>
            c = Fricción
          </span>
          <h4 className={styles.explanationTitle}>
            {isEs ? 'Amortiguación (Damping)' : 'Damping (c)'}
          </h4>
          <p className={styles.explanationFormula}>F_d = -c · v</p>
          <p className={styles.explanationText}>
            {isEs
              ? 'Fricción que absorbe la energía del movimiento. Si el amortiguamiento es bajo (c < 15), el objeto rebotará varias veces antes de reposar. Si es alto (c > 35), frenará sin sobreoscilación.'
              : 'Friction absorbing kinetic energy. Low damping (c < 15) rings with pronounced bounces before settling. High damping (c > 35) slows down smoothly without oscillation.'}
          </p>
        </article>

        {/* Mass Card */}
        <article className={styles.explanationCard}>
          <span className={`${styles.explanationBadge} ${styles.badgeMass}`}>
            m = Inercia
          </span>
          <h4 className={styles.explanationTitle}>
            {isEs ? 'Masa (Mass)' : 'Mass (m)'}
          </h4>
          <p className={styles.explanationFormula}>F = m · a</p>
          <p className={styles.explanationText}>
            {isEs
              ? 'Define la resistencia del objeto a cambiar su velocidad. Una masa pesada (m > 2) transmite solidez e inercia tangible, mientras que una masa ligera (m < 0.8) reacciona sin retraso perceptivo.'
              : 'Defines the resistance to change velocity. Heavy mass (m > 2) conveys tangible physical weight and momentum, whereas light mass (m < 0.8) snaps into position with zero felt drag.'}
          </p>
        </article>
      </div>

      {/* Live Motion Code Snippet */}
      <div className={styles.codeSection}>
        <div className={styles.codeHeader}>
          <h4 className={styles.codeTitle}>
            {isEs ? 'CÓDIGO MOTION/REACT EN VIVO' : 'LIVE MOTION/REACT SNIPPET'}
          </h4>
          <button
            type="button"
            onClick={handleCopy}
            className={styles.btnSecondary}
            aria-label={
              copied
                ? isEs
                  ? 'Copiado al portapapeles'
                  : 'Copied to clipboard'
                : isEs
                  ? 'Copiar código de configuración'
                  : 'Copy configuration code'
            }
          >
            {copied ? (
              <>
                <Check size={16} aria-hidden="true" />
                <span>{isEs ? '¡Copiado!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy size={16} aria-hidden="true" />
                <span>
                  {isEs
                    ? 'Copiar código de configuración'
                    : 'Copy configuration code'}
                </span>
              </>
            )}
          </button>
        </div>

        <pre className={styles.codeBlock}>
          <code>{codeSnippet}</code>
        </pre>

        {/* Screen reader notification for copy action */}
        <div aria-live="polite" className={styles.srOnly}>
          {copied
            ? isEs
              ? 'Código copiado al portapapeles correctamente'
              : 'Code successfully copied to clipboard'
            : null}
        </div>
      </div>
    </section>
  );
}
