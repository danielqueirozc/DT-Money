import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: var(--gray900);
    color: var(--gray300);
    padding: 1rem;

    &::placeholder {
      color: var(--gray500);
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    padding: 1rem;
    background: transparent;
    border: 1px solid var(--green300);
    color: var(--green300);
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: var(--green500);
      border-color: var(--green500);
      color: var(--white);
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`
