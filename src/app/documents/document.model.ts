export class DocumentModel {
  public id: string;
  public name: string;
  public description: string;
  public url: string;
  public children: Array<DocumentModel> = new Array<DocumentModel>();

  constructor(theId: string, theName: string, theDescription: string, theUrl: string) {
    this.id = theId;
    this.name = theName;
    this.description = theDescription;
    this.url = theUrl;
  }
}
