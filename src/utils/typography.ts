export interface TypographyConfig {
  font: string;
  size: string;
}

export const getFontFamily = (font: string): string => {
  const fonts: Record<string, string> = {
    'nunito': 'Nunito',
    'archivo-narrow': 'Archivo Narrow',
    'syne': 'Syne',
    'dm-serif-display': '"DM Serif Display", "DM Sans"',
    'poppins': 'Poppins',
    'rubik': 'Rubik',
    'fira-sans': 'Fira Sans',
    'josefin-sans': 'Josefin Sans',
    'roboto-mono': 'Roboto Mono',
    'fjalla-one': '"Fjalla One", Inter'
  };
  return fonts[font] || fonts['nunito'];
};

export const getFontSize = (size: string): string => {
  const sizes: Record<string, string> = {
    'small': '0.875rem',
    'medium': '1rem',
    'big': '1.125rem'
  };
  return sizes[size] || sizes['medium'];
};