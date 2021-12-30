import { gql } from '@apollo/client';

export interface FormValues {
  name: string;
  email:string;
  password: string;
}

export interface statusProps {
  status: boolean;
}

export interface Pregunta {
  id: string;
  nro : number;
  pregunta: string;
}

export interface CardPregunta {
  pregunta: string;
  indice: number;
  status: boolean;
}

export const ALL_QUESTIONS = gql`
  query {
    allPreguntas {
      pregunta
      status
      nro
      id
    }
  }
`;

export const QUESTION = gql`
  query QUESTION($nro: Int!){
    findPregunta(nro: $nro) {
      pregunta
      status
    }
  }
`;

export const CHANGE_STATUS = gql`
  mutation changeStatus($nro: Int!){
    changeStatus(nro: $nro) {
      pregunta
      status
    }
  }
`;
