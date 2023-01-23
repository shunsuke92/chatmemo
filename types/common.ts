export interface EditingContent {
  id: string;
  body: string;
  comments: { id: string; body: string }[];
}

export interface EditingInfo {
  before: EditingContent;
  after: EditingContent;
}
