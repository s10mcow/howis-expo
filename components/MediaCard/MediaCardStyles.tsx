import styled from "styled-components/native";

export const User = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 5px;
`;

export const UserName = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  font-size: 14px;
  color: white;
`;

export const TimeAgo = styled.View`
  display: flex;
  margin-top: 10px;
  margin-left: 5px;
`;

export const Card = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  border-radius: 0px;
  position: relative;
`;

export const MediaContainer = styled.View`
  position: relative;
`;

export const Media = styled.Image`
  width: 100%;
  height: undefined;
  aspect-ratio: 1;
  resize-mode: cover;
  border-radius: 5px;
`;

export const HeaderContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
`;

export const FooterButton = styled.TouchableOpacity`
  margin: 5px;
  margin-right: 20px;
`;

export const FooterContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

export const Likes = styled.View``;
