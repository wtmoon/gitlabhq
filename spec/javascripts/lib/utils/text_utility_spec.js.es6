require('~/lib/utils/text_utility');

(() => {
  describe('text_utility', () => {
    describe('gl.text.getTextWidth', () => {
      it('returns zero width when no text is passed', () => {
        expect(gl.text.getTextWidth('')).toBe(0);
      });

      it('returns zero width when no text is passed and font is passed', () => {
        expect(gl.text.getTextWidth('', '100px sans-serif')).toBe(0);
      });

      it('returns width when text is passed', () => {
        expect(gl.text.getTextWidth('foo') > 0).toBe(true);
      });

      it('returns bigger width when font is larger', () => {
        const largeFont = gl.text.getTextWidth('foo', '100px sans-serif');
        const regular = gl.text.getTextWidth('foo', '10px sans-serif');
        expect(largeFont > regular).toBe(true);
      });
    });

    describe('gl.text.pluralize', () => {
      it('returns pluralized', () => {
        expect(gl.text.pluralize('test', 2)).toBe('tests');
      });

      it('returns pluralized when count is 0', () => {
        expect(gl.text.pluralize('test', 0)).toBe('tests');
      });

      it('does not return pluralized', () => {
        expect(gl.text.pluralize('test', 1)).toBe('test');
      });
    });
  });
})();
