import styled from  'styled-components/native';

export const Container = styled.View `
    padding: 14px;
`;

export const Title = styled.Text `
    color: #fff;
    font-size: ${props => props.size}px;
    font-weight: bold;
`;

export const RateContainer = styled.View `
    flex-direction: row;
    align-items: center;
    padding: 8px 0;
`;

export const Rate = styled.Text `
    color: #fff;
    font-size: 12px;
    padding-left: 4px;
`;

export const ActionContainer = styled.View `
    flex-direction: row;
    align-items: center;
`;

export const DetailButton = styled.TouchableOpacity `
    width: 85%;
    height: 30px;
    background-color: #3B325B;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
`;

export const DeleteButton = styled.TouchableOpacity `
    justify-content: center;
    align-items: center;
`;