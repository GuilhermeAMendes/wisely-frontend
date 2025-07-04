import styled from "styled-components";

export const Container = styled.div`
  width: 12rem;
  height: 8rem;

  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 0.5rem 0.25rem;

  position: relative;
  cursor: pointer;

  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Tab = styled.div`
  position: absolute;

  width: 8rem;
  height: 1.5rem;

  top: -1rem;
  left: 0.5rem;

  background-color: ${({ theme }) => theme.colors.gray};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  z-index: 2;

  max-width: 100%;

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Content = styled.div`
  position: absolute;

  bottom: 0;
  left: 0;
  right: 0;
  top: 0.75rem;
  border-radius: 0.25rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Wrapper = styled.div`
  width: 100%;
`;

export const MoreButton = styled.button`
  z-index: 10;
  position: absolute;
  top: 70%;
  right: 0.25rem;

  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;
