/* tslint:disable */
/* eslint-disable */

export class languageDto {
    name: string | undefined;
    description: string | undefined;
  }
  export class stepsDTO {
    languageId: string | undefined;
    name: string | undefined;
    description: string | undefined;
  }
  export class userDTO {
    name: string | undefined;
    email: string | undefined;
    mobileNumber: string | undefined;
    uid: string | undefined;
  }
  export class LanguageModel {
    id: string | undefined;
    name: string | undefined;
    description: string | undefined;
  }
  
  export abstract class IMutation {
    createLanguage?: LanguageModel;
    createSteps?: StepsModel[] | undefined;
    createUsers?: usersModel[] | undefined;
    deleteLanguage?: LanguageModel;
    deleteSteps?: StepsModel;
    deleteUsers?: usersModel;
    updateLanguage?: LanguageModel;
    updateSteps?: StepsModel[] | undefined;
    updateUsers?: usersModel[] | undefined;
  }
  export abstract class IQuery {
    User: usersModel[] | undefined;
    getLanguages: LanguageModel[] | undefined;
    getSteps?: StepsModel[] | undefined;
    getUsers?: usersModel[] | undefined;
    getStepsUsingLanguage: StepsModel[] | undefined;
    getstepsUsingLanguageId?: StepsModel[];
  }
  export class StepsModel {
    id: string | undefined;
    name: string | undefined;
    description: string | undefined;
    languageId: any;
  }
  export class usersModel {
    id?: Nullable<string>;
    email?: Nullable<string>;
    name?: Nullable<string>;
    mobileNumber?: Nullable<string>;
    uid?: string;
  }
  type Nullable<T> = T | null;
  