import { ExchagneSearchBody } from './ExchagneSearchBody.interface';

export interface ExchagngeSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: ExchagneSearchBody;
    }>;
  };
}
