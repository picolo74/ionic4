import { Page } from './page.model';
export class PaginatedResult {
    public items: any[] = [];
    public page: Page;
    total: number;
    pageSize = 50;
}


