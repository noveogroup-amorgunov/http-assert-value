const catchError = require('catch-error-async');
const assert = require('assert');

const sut = require('..');

describe('assert', () => {
    describe('identity', () => {
        it('should do nothing when identity is valid', () => {
            sut.identity('valid');
            sut.identity('123', 'Field name');
            sut.identity('with-dash');
            sut.identity('with_underscore');
            sut.identity('UPPERCASE');
            sut.identity('with.dot');
            sut.identity(['first', 'second', 'third']);
        });

        it('should throw error with custom field', async () => {
            const error = await catchError(sut.identity, 'inv@l!d', 'Custom field name');

            assert.strictEqual(error.message, 'Custom field name is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_III',
                value: 'inv@l!d'
            });
        });

        it('should throw error with default field', async () => {
            const error = await catchError(sut.identity, 'inv@l!d');

            assert.strictEqual(error.message, 'Identity is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_III',
                value: 'inv@l!d'
            });
        });

        it('should throw error when value is empty', async () => {
            const error = await catchError(sut.identity, '');

            assert.strictEqual(error.message, 'Identity is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_III',
                value: ''
            });
        });

        it('should throw error for value from array', async () => {
            const error = await catchError(sut.identity, ['first', 'second', 'inv@lid']);

            assert.strictEqual(error.message, 'Identity is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_III',
                value: 'inv@lid'
            });
        });
    });

    describe('float', () => {
        it('should do nothing when float is valid', () => {
            sut.float('123');
            sut.float('12.3', 'Field name');
            sut.float('12.');
            sut.float('-1');
            sut.float(['3.14', '2', '0']);
        });

        it('should throw error with custom field', async () => {
            const error = await catchError(sut.float, '6ft', 'Weight');

            assert.strictEqual(error.message, 'Weight is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_FVI',
                value: '6ft'
            });
        });

        it('should throw error with default field', async () => {
            const error = await catchError(sut.float, '127.0.0.1');

            assert.strictEqual(error.message, 'Float is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_FVI',
                value: '127.0.0.1'
            });
        });

        it('should throw error when value is empty', async () => {
            const error = await catchError(sut.float, '');

            assert.strictEqual(error.message, 'Float is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_FVI',
                value: ''
            });
        });

        it('should throw error for value from array', async () => {
            const error = await catchError(sut.float, ['3.14', '2', '<3']);

            assert.strictEqual(error.message, 'Float is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_FVI',
                value: '<3'
            });
        });
    });

    describe('positiveInt', () => {
        it('should do nothing when positiveInt is valid', () => {
            sut.positiveInt('123');
            sut.positiveInt('12', 'Field name');
            sut.positiveInt(['1', '23', '456']);
        });

        it('should throw error with custom field', async () => {
            const error = await catchError(sut.positiveInt, '0', 'Page size');

            assert.strictEqual(error.message, 'Page size is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_PII',
                value: '0'
            });
        });

        it('should throw error with default field', async () => {
            const error = await catchError(sut.positiveInt, '-1');

            assert.strictEqual(error.message, 'Positive integer is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_PII',
                value: '-1'
            });
        });

        it('should throw error when value is empty', async () => {
            const error = await catchError(sut.positiveInt, '');

            assert.strictEqual(error.message, 'Positive integer is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_PII',
                value: ''
            });
        });

        it('should throw error for value from array', async () => {
            const error = await catchError(sut.positiveInt, ['1', '23', '-8']);

            assert.strictEqual(error.message, 'Positive integer is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_PII',
                value: '-8'
            });
        });
    });

    describe('text', () => {
        it('should do nothing when text is valid', () => {
            sut.text('Correct');
            sut.text('12', 'Field name');
            sut.text('with spaces');
            sut.text('with-dash');
            sut.text(['first', 'second', 'third']);
        });

        it('should throw error with custom field', async () => {
            const error = await catchError(
                sut.text,
                'drop database "yablogs";',
                'Suggest text'
            );

            assert.strictEqual(error.message, 'Suggest text is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_TVI',
                value: 'drop database "yablogs";'
            });
        });

        it('should throw error with default field', async () => {
            const error = await catchError(sut.text, 'inv@l!d');

            assert.strictEqual(error.message, 'Text is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_TVI',
                value: 'inv@l!d'
            });
        });

        it('should throw error when value is empty', async () => {
            const error = await catchError(sut.text, '');

            assert.strictEqual(error.message, 'Text is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_TVI',
                value: ''
            });
        });

        it('should throw error for value from array', async () => {
            const error = await catchError(sut.text, ['first', 'second', 'inv@lid']);

            assert.strictEqual(error.message, 'Text is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_TVI',
                value: 'inv@lid'
            });
        });
    });

    describe('bySchema', () => {
        const schema = require('./user');

        it('should do nothing when data is valid', () => {
            sut.bySchema({ id: '1111', login: 'zhigalov', age: 27 }, schema);
            sut.bySchema({ id: '2222' }, schema);
            sut.bySchema([
                { id: '3333', login: 'YuuKohaku' },
                { id: '4444', login: 'noveogroup-amorgunov' }
            ], schema);
        });

        it('should throw error when check by schema failed', async () => {
            const error = await catchError(sut.bySchema, {}, schema);

            assert.strictEqual(error.message, 'Check by schema failed');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_CSF',
                errors: [
                    {
                        dataPath: '',
                        keyword: 'required',
                        message: 'should have required property \'id\'',
                        params: { missingProperty: 'id' },
                        schemaPath: '#/required'
                    }
                ]
            });
        });

        it('should throw error for value from array', async () => {
            const error = await catchError(
                sut.bySchema,
                [{}, { id: '5555' }],
                schema
            );

            assert.strictEqual(error.message, 'Check by schema failed');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_CSF',
                errors: [
                    {
                        dataPath: '',
                        keyword: 'required',
                        message: 'should have required property \'id\'',
                        params: { missingProperty: 'id' },
                        schemaPath: '#/required'
                    }
                ]
            });
        });
    });

    describe('tryIdentity', () => {
        it('should do nothing when identity is valid', () => {
            sut.tryIdentity('valid');
            sut.tryIdentity(['one', 'more', 'valid']);
        });

        it('should do nothing when identity is undefined', () => sut.tryIdentity());

        it('should throw error when identity is invalid', async () => {
            const error = await catchError(sut.tryIdentity, 'inv@l!d');

            assert.strictEqual(error.message, 'Identity is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_III',
                value: 'inv@l!d'
            });
        });

        it('should throw error for value from array', async () => {
            const error = await catchError(sut.tryIdentity, ['one', 'two', 'inv@l!d']);

            assert.strictEqual(error.message, 'Identity is invalid');
            assert.strictEqual(error.statusCode, 400);
            assert.deepStrictEqual(error.options, {
                internalCode: '400_III',
                value: 'inv@l!d'
            });
        });
    });
});
