import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PageData, Theme } from './types';
import { renderSection } from './SectionRegistry';
import { Helmet } from 'react-helmet-async';
import './dynamic-styles.css';

export const DynamicPage: React.FC = () => {
  const { industrySlug } = useParams<{ industrySlug: string }>();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPageData();
  }, [industrySlug]);

  const loadPageData = async () => {
    if (!industrySlug) {
      setError('Industry slug is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: industry, error: industryError } = await supabase
        .from('industries')
        .select('*')
        .eq('slug', industrySlug)
        .eq('is_active', true)
        .maybeSingle();

      if (industryError) throw industryError;
      if (!industry) {
        setError('Industry not found');
        setLoading(false);
        return;
      }

      const { data: page, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('industry_id', industry.id)
        .eq('slug', 'home')
        .maybeSingle();

      if (pageError) throw pageError;
      if (!page) {
        setError('Page not found');
        setLoading(false);
        return;
      }

      const { data: sections, error: sectionsError } = await supabase
        .from('sections')
        .select('*')
        .eq('page_id', page.id)
        .eq('visible', true)
        .order('order');

      if (sectionsError) throw sectionsError;

      setPageData({
        theme: industry.theme as Theme,
        seo: industry.seo,
        layout: sections || []
      });

      applyTheme(industry.theme as Theme);
    } catch (err) {
      console.error('Error loading page data:', err);
      setError('Failed to load page');
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;

    // Legacy support (old theme format)
    if (theme.brand) {
      root.style.setProperty('--color-brand', theme.brand);
      root.style.setProperty('--color-primary', theme.brand);
    }
    if (theme.text) root.style.setProperty('--color-text', theme.text);
    if (theme.accent) root.style.setProperty('--color-accent', theme.accent);
    if (theme.background) root.style.setProperty('--color-background', theme.background);
    if (theme.font) root.style.setProperty('--font-primary', theme.font);

    // New advanced theme system
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }

    if (theme.typography) {
      if (theme.typography.fontFamily) {
        root.style.setProperty('--font-family', theme.typography.fontFamily);
      }
      if (theme.typography.headingFont) {
        root.style.setProperty('--font-heading', theme.typography.headingFont);
      }
      if (theme.typography.bodyFont) {
        root.style.setProperty('--font-body', theme.typography.bodyFont);
      }
      if (theme.typography.sizes) {
        Object.entries(theme.typography.sizes).forEach(([key, value]) => {
          root.style.setProperty(`--text-${key}`, value);
        });
      }
      if (theme.typography.weights) {
        Object.entries(theme.typography.weights).forEach(([key, value]) => {
          root.style.setProperty(`--font-${key}`, String(value));
        });
      }
    }

    if (theme.spacing) {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        root.style.setProperty(`--spacing-${key}`, value);
      });
    }

    if (theme.borderRadius) {
      Object.entries(theme.borderRadius).forEach(([key, value]) => {
        root.style.setProperty(`--radius-${key}`, value);
      });
    }

    if (theme.shadows) {
      Object.entries(theme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--shadow-${key}`, value);
      });
    }

    if (theme.animations) {
      Object.entries(theme.animations).forEach(([key, value]) => {
        root.style.setProperty(`--animation-${key}`, value);
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The requested page could not be found.'}</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageData.seo.title}</title>
        <meta name="description" content={pageData.seo.description} />
        {pageData.seo.image && <meta property="og:image" content={pageData.seo.image} />}
        <meta property="og:title" content={pageData.seo.title} />
        <meta property="og:description" content={pageData.seo.description} />
      </Helmet>

      <div className="webflix-one-page">
        {pageData.layout.map((section, index) =>
          renderSection(section.key, section.props, index, section.design_variant)
        )}
      </div>
    </>
  );
};
