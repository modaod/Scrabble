import { Letter } from './letter';

describe('Letter', () => {
    it('should create an instance', () => {
        expect(new Letter('A', 0)).toBeTruthy();
    });
});
