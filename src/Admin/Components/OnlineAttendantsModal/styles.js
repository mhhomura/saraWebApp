import styled from 'styled-components';
import { Modal } from 'reactstrap';

export const Container = styled.div`
`;

export const CustomModal = styled(Modal)`
    .modal-content {
        background: #F3F7FF 0% 0% no-repeat padding-box;
        box-shadow: 0px 14px 32px #00000040;
        border-radius: 10px;
        border: 0;

        font-family: 'Mulish';
        color: #434343;
    }
    
    .modal-title {
        font-size: 18px;
        font-weight: bold;
    }    

    .modal-header{
        border-bottom: 0;
    }

    .modal-footer{
        border-top: 0;
    }
`;

export const NoOperators = styled.div`
    width: 100%;
    height: 8rem;

    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #DEE3EA;
    border-radius: 5px;
    opacity: 1;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-weight: bold;
    
    color: #333333;

    .alert {
        > img {
            margin-right: 15px;
            width: 2rem;
        }
    }
`;