#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable */
const { Buffer } = require('node:buffer');

/**
 * MedAdvance Splash Screen Generator
 * Creates splash screen images for light and dark modes
 * Requires: npm install sharp
 */

const fs = require('node:fs');
const path = require('node:path');

// Try to use sharp if available, otherwise provide instructions
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.warn('sharp not available:', err && err.message ? err.message : err);
  console.log('To generate splash screen images, install sharp:');
  console.log('npm install --save-dev sharp');
  console.log('\nFor now, using placeholder splash screens...');
  sharp = null;
}

const assetsDir = path.join(process.cwd(), 'assets', 'images');

// SVG content for splash screen - Light mode
const lightSplashSVG = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle -->
  <circle cx="100" cy="100" r="95" fill="#00A0E1" opacity="0.1"/>
  
  <!-- Main circle badge -->
  <circle cx="100" cy="60" r="50" fill="#00A0E1"/>
  
  <!-- Health icon (simplified cross) -->
  <g fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round">
    <!-- Vertical bar -->
    <rect x="92" y="35" width="16" height="50" rx="8"/>
    <!-- Horizontal bar -->
    <rect x="67" y="52.5" width="66" height="16" rx="8"/>
  </g>
  
  <!-- App name -->
  <text x="100" y="140" font-size="28" font-weight="bold" text-anchor="middle" fill="#00A0E1" font-family="Arial, sans-serif">
    MedAdvance
  </text>
  
  <!-- Accent line -->
  <line x1="60" y1="155" x2="140" y2="155" stroke="#FFCDB2" stroke-width="2" stroke-linecap="round"/>
  
  <!-- Tagline -->
  <text x="100" y="175" font-size="11" text-anchor="middle" fill="#764318" font-family="Arial, sans-serif" font-style="italic">
    Healthcare Solutions
  </text>
</svg>`;

// SVG content for splash screen - Dark mode
const darkSplashSVG = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle -->
  <circle cx="100" cy="100" r="95" fill="#00A0E1" opacity="0.15"/>
  
  <!-- Main circle badge -->
  <circle cx="100" cy="60" r="50" fill="#00A0E1"/>
  
  <!-- Health icon (simplified cross) -->
  <g fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round">
    <!-- Vertical bar -->
    <rect x="92" y="35" width="16" height="50" rx="8"/>
    <!-- Horizontal bar -->
    <rect x="67" y="52.5" width="66" height="16" rx="8"/>
  </g>
  
  <!-- App name -->
  <text x="100" y="140" font-size="28" font-weight="bold" text-anchor="middle" fill="#33B3E8" font-family="Arial, sans-serif">
    MedAdvance
  </text>
  
  <!-- Accent line -->
  <line x1="60" y1="155" x2="140" y2="155" stroke="#FFCDB2" stroke-width="2" stroke-linecap="round"/>
  
  <!-- Tagline -->
  <text x="100" y="175" font-size="11" text-anchor="middle" fill="#FFCDB2" font-family="Arial, sans-serif" font-style="italic">
    Healthcare Solutions
  </text>
</svg>`;

async function generateSplashScreens() {
  try {
    if (!sharp) {
      console.log('Skipping splash screen image generation.');
      console.log('Install sharp to auto-generate: npm install --save-dev sharp');
      return;
    }

    // Generate light mode splash screen
    const lightBuffer = Buffer.from(lightSplashSVG);
    await sharp(lightBuffer)
      .png()
      .toFile(path.join(assetsDir, 'splash-icon.png'));
    console.log('✓ Created splash-icon.png (light mode)');

    // Generate dark mode splash screen
    const darkBuffer = Buffer.from(darkSplashSVG);
    await sharp(darkBuffer)
      .png()
      .toFile(path.join(assetsDir, 'splash-icon-dark.png'));
    console.log('✓ Created splash-icon-dark.png (dark mode)');

    console.log('\nMedAdvance splash screens generated successfully!');
  } catch (error) {
    console.error('Error generating splash screens:', error.message);
    process.exit(1);
  }
}

// Run if this is the main module
if (require.main === module) {
  generateSplashScreens().catch((err) => {
    console.error('Error generating splash screens:', err);
    process.exit(1);
  });
}

module.exports = { generateSplashScreens };
