export class DocumentModel {
  public id: number;
  public name: string;
  public description: string;
  public url: string;
  public children: Array<DocumentModel> = new Array<DocumentModel>();

}
