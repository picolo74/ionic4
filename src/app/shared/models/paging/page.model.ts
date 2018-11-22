import { Sort } from './sort.model';
export class Page {
    sort: Sort[];

    constructor(sorts: Sort[], public index: number = 0, public size: number = 50, public total: number = 0) {
        this.sort = sorts;
    }
}

export class Pagination {
    first: number;
    page: number;
    pageCount?: number;
    rows?: number;
}
