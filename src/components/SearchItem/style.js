import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity `
    padding: 14px;
`;

export const Banner = styled.Image `
    width: 100%;
    height: 140px;
    border-radius: 8px;
`;

export const Title = styled.Text `
    font-size: 18px;
    font-weight: bold;
    padding-top: 8px;
    color: #FFF;
`;

export const RateContainer = styled.View `
    flex-direction: row;
    align-items: center;
`;

export const Rate = styled.Text `
    padding-left: 5px;
    color: #FFF;
    font-size: 12px;
`;