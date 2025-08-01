export const numberInXOF = (number: number) => {
    return number.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'XOF',
    });
}