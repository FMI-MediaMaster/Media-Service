import { Controller } from './template';
import type { Tables } from '@types';
import {
    NoteCreateSchema,
    NoteUpdateSchema,
} from '@schemas';

export class NoteController extends Controller<Tables<'note'>> {
    constructor() {
        super({
            resource: 'note',
            createSchema: NoteCreateSchema,
            updateSchema: NoteUpdateSchema,
            requiresUser: true,
            assureExistanceInTable: 'media',
        });
    };
};
