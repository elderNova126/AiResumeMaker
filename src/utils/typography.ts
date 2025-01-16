export interface TypographyConfig {
  font: string;
  size: string;
}

export const getFontFamily = (font: string): string => {
  const fonts: Record<string, string> = {
    'Nunito': "'Nunito'",
    'Calibri ': "'Calibri'",
    'Arial': "'Arial'",    
    'Times New Roman': "'Times New Roman'",
    'Helvetica':"'Helvetica'",
    'Georgia':"'Georgia'",
    'Garamond':"'Garamond'",
    'Verdana':"'Verdana'",
    'Tahoma':"'Tahoma'",
    'Cambria':"'Cambria'",
    'trebuchet MS':"'Trebuchet MS'",
    'roboto-mono': "'Roboto Mono'",
    'poppins': "'Poppins'",
  };
  return fonts[font] || fonts['Nunito'];
};

export const getFontSize = (size: string): string => {
  const sizes: Record<string, string> = {
    'small': '6',
    'medium': '8',
    'big': '10'
  };
  return sizes[size] || sizes['medium'];
};
export const getFontSize1 = (size: string): string => {
  const sizes: Record<string, string> = {
    'small': '10',
    'medium': '12',
    'big': '14'
  };
  return sizes[size] || sizes['medium'];
};