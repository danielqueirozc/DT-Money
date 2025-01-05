import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 8px;
  padding: 2.5rem 3rem;
  background-color: var(--gray800);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 8px;
      border: 0;
      background-color: var(--gray900);
      color: var(--gray300);
      padding: 1rem;

      &::placeholder {
        color: var(--gray500);
      }
    }

    button[type='submit'] {
      height: 58px;
      border: 0;
      background-color: var(--green500);
      color: var(--white);
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 8px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background-color: var(--green700);
        transition: backround-color 10s;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;

  border: 0;
  background-color: transparent;
  color: var(--gray500);

  line-height: 0;
  cursor: pointer;
`
export const TransactionTypeComponent = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background-color: var(--gray700);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  border: 0;
  color: var(--gray300);

  svg {
    color: ${(props) => (props.variant === 'income' ? '#00b37e' : '#f75A68')};
  }

  &[data-state='checked'] {
    color: var(--white);
    background-color: ${(props) =>
      props.variant === 'income' ? '#00875f' : '#aa2834'};

    svg {
      color: var(--white);
    }
  }

  &[data-state='unchecked']:hover {
    background-color: var(--gray600);
    transition: background-color 0.2s;
  }
`
