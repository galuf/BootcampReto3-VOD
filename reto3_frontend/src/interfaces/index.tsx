import { gql } from '@apollo/client';

export interface FormValues {
  name: string;
  email:string;
  password: string;
}

export const Preguntas = {
  1: 'Porque elegiste la programacion 1',
  2: 'Porque elegiste la programacion 2',
  3: 'Porque elegiste la programacion 3',
  4: 'Porque elegiste la programacion 4',
  5: 'Porque elegiste la programacion 5',
  6: 'Porque elegiste la programacion 6',
  7: 'Porque elegiste la programacion 7',
  8: 'Porque elegiste la programacion 8',
  9: 'Porque elegiste la programacion 9',
  10: 'Porque elegiste la programacion 10',
};

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
