import styled, { css } from "styled-components";
import {
  Dimensions,
  Image as RNImage,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

export const Image = styled(RNImage)`
  height: ${Dimensions.get("window").width}px;
  width: 100%;
  margin-top: 0px;
  ${(p) =>
    p.isLoading &&
    css`
      opacity: 0.5;
    `}
`;
export const SmallImage = styled(RNImage)`
  width: ${Dimensions.get("screen").width}px;
  height: ${Dimensions.get("screen").width}px;

  margin-top: 0px;
  ${(p) =>
    p.isLoading &&
    css`
      opacity: 0.5;
    `}
`;

export const Row = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ExpandIconButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 40px;
  left: 10px;
  background-color: black;
  border-radius: 25px;
  padding: 10px;
`;

export const LightText = styled(Text)`
  color: white;
`;
