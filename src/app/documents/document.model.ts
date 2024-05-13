export class DocumentModel {
  public id: number;
  public name: string;
  public description: string;
  public url: string;
  public children: Array<DocumentModel> = new Array<DocumentModel>();

  constructor(theId: number, theName: string, theDescription: string, theUrl: string) {
    this.id = theId;
    this.name = theName;
    this.description = theDescription;
    this.url = theUrl;
  }
}
