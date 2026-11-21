'use client';

import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  LayoutGrid,
  List,
  Shuffle,
  RotateCcw,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import {
  LAYOUT_ITEMS,
  generateMotionLayoutSnippet,
  type LayoutItem
} from '@/data/lab';
import styles from './motion.module.css';

interface LayoutPlaygroundProps {
  locale?: string;
}

type CategoryFilter = 'all' | 'mobile' | 'web' | 'systems';

export function LayoutPlayground({ locale = 'es' }: LayoutPlaygroundProps) {
  const isEs = locale === 'es';
  const shouldReduceMotion = useReducedMotion();

  // State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('all');
  const [items, setItems] = useState<LayoutItem[]>([...LAYOUT_ITEMS]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Filter items based on current category
  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  // Shuffle items using Fisher-Yates algorithm
  const handleShuffle = useCallback(() => {
    setItems((prevItems) => {
      const array = [...prevItems];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    });
  }, []);

  // Reset to default initial state
  const handleReset = useCallback(() => {
    setViewMode('grid');
    setSelectedCategory('all');
    setItems([...LAYOUT_ITEMS]);
    setActiveItemId(null);
  }, []);

  // Copy code snippet
  const codeSnippet = generateMotionLayoutSnippet(viewMode);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [codeSnippet]);

  // Tag color helper
  const getTagClass = (category: LayoutItem['category']) => {
    switch (category) {
      case 'mobile':
        return styles.tagMobile;
      case 'web':
        return styles.tagWeb;
      case 'systems':
        return styles.tagSystems;
      default:
        return '';
    }
  };

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: isEs ? 'Todos' : 'All' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'web', label: 'Web' },
    { key: 'systems', label: 'Systems' }
  ];

  return (
    <section
      id="layout-animation"
      aria-labelledby="layout-playground-title"
      className={styles.playgroundContainer}
    >
      {/* Header */}
      <header className={styles.header}>
        <p className={styles.eyebrow}>05 / MOTION ENGINEERING</p>
        <h2 id="layout-playground-title" className={styles.title}>
          {isEs ? 'Transiciones de Layout FLIP' : 'Layout Animation Playground'}
        </h2>
        <p className={styles.description}>
          {isEs
            ? 'Experimentá transiciones de layout fluidas con la técnica FLIP nativa de Motion. Cambiá la vista entre cuadrícula y lista, filtrá por categoría o reordená tarjetas interactivas preservando la jerarquía accesible del DOM.'
            : 'Experience fluid layout transitions powered by Motion’s native FLIP engine. Toggle between grid and list modes, filter categories, or shuffle cards while preserving logical DOM focus order.'}
        </p>
      </header>

      {/* Controls Bar: Layout mode toggle, category filter, shuffle & reset */}
      <div className={styles.layoutControlsRow}>
        {/* View Toggle */}
        <div
          className={styles.viewToggleGroup}
          role="group"
          aria-label={isEs ? 'Modo de visualización' : 'View layout mode'}
        >
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
            className={styles.viewToggleBtn}
          >
            <LayoutGrid size={16} aria-hidden="true" />
            <span>{isEs ? 'Cuadrícula' : 'Grid'}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
            className={styles.viewToggleBtn}
          >
            <List size={16} aria-hidden="true" />
            <span>{isEs ? 'Lista' : 'List'}</span>
          </button>
        </div>

        {/* Category Filters */}
        <div
          className={styles.layoutFilters}
          role="group"
          aria-label={isEs ? 'Filtrar por categoría' : 'Filter by category'}
        >
          <span className={styles.filterLabel}>
            {isEs ? 'Filtrar:' : 'Filter:'}
          </span>
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              aria-pressed={selectedCategory === cat.key}
              className={
                selectedCategory === cat.key
                  ? styles.btnActive
                  : styles.btnSecondary
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Actions: Shuffle & Reset */}
        <div
          className={styles.toolbar}
          role="toolbar"
          aria-label={isEs ? 'Acciones de layout' : 'Layout actions'}
        >
          <button
            type="button"
            onClick={handleShuffle}
            className={styles.btnPrimary}
            aria-label={
              isEs
                ? 'Reordenar tarjetas aleatoriamente'
                : 'Shuffle cards randomly'
            }
          >
            <Shuffle size={16} aria-hidden="true" />
            <span>{isEs ? 'Reordenar' : 'Shuffle'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={styles.btnSecondary}
            aria-label={
              isEs ? 'Restablecer orden y filtros' : 'Reset order and filters'
            }
          >
            <RotateCcw size={16} aria-hidden="true" />
            <span>{isEs ? 'Restablecer' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Layout Stage */}
      <div className={styles.layoutStage}>
        <motion.ul
          layout
          className={viewMode === 'grid' ? styles.itemsGrid : styles.itemsList}
          aria-label={
            isEs
              ? `Lista de tarjetas interactivas (${filteredItems.length} elementos)`
              : `Interactive card collection (${filteredItems.length} items)`
          }
        >
          {filteredItems.map((item) => {
            const isSelected = activeItemId === item.id;
            return (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.1 }
                    : { type: 'spring', stiffness: 350, damping: 25 }
                }
                className={styles.itemCard}
                style={{
                  borderColor: isSelected ? '#000000' : '#000000',
                  boxShadow: isSelected
                    ? '6px 6px 0px #000000'
                    : '4px 4px 0px #000000'
                }}
              >
                <div className={styles.itemCardHeader}>
                  <span className={styles.itemIndex}>{item.index}</span>
                  <span
                    className={`${styles.itemTag} ${getTagClass(item.category)}`}
                  >
                    {item.tag}
                  </span>
                  <span className={styles.categoryBadge}>{item.category}</span>
                </div>

                <h3 className={styles.itemTitle}>
                  {isEs ? item.title.es : item.title.en}
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setActiveItemId((curr) =>
                      curr === item.id ? null : item.id
                    )
                  }
                  className={styles.btnSecondary}
                  aria-pressed={isSelected}
                  aria-label={
                    isEs
                      ? `Inspeccionar ${item.title.es}`
                      : `Inspect ${item.title.en}`
                  }
                  style={{
                    alignSelf: viewMode === 'grid' ? 'flex-start' : 'center'
                  }}
                >
                  <Sparkles size={14} aria-hidden="true" />
                  <span>{isEs ? 'Inspeccionar' : 'Inspect'}</span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {/* Live Motion Layout Code Snippet */}
      <div className={styles.codeSection}>
        <div className={styles.codeHeader}>
          <h4 className={styles.codeTitle}>
            {isEs ? 'CÓDIGO MOTION LAYOUT' : 'MOTION LAYOUT SNIPPET'}
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
                  ? 'Copiar código de animación'
                  : 'Copy animation code'
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
                  {isEs ? 'Copiar código de animación' : 'Copy animation code'}
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
