// ButtonComponents.js
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ButtonComponents = styled.TouchableOpacity`
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.primary};
  flexDirection: 'row';
  justifyContent: 'center';
  alignItems: 'center';
`;

const ThemeButton = ({ onPress, theme }) => (
  <ButtonComponents onPress={onPress} theme={theme}>
    <Icon name={theme.darkMode ? 'brightness-3' : 'brightness-7'} size={20} color={theme.text} />
  </ButtonComponents>
);

export default ThemeButton;