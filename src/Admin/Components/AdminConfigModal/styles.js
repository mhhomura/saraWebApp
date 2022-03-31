import styled from 'styled-components';
import { Modal } from 'reactstrap';

export const Container = styled.div``;

export const ConfigModal = styled(Modal)`
        .modal-content {
        background: #F3F7FF 0% 0% no-repeat padding-box;
        box-shadow: 0px 14px 32px #00000040;
        border-radius: 10px;
        border: 0;

        font-family: 'Mulish';
        font-weight: bold;
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

    .modal-body{
        margin-top: -30px;
    }
`;

export const ConfigForm = styled.div`
    font-family: 'Mulish';
    font-weight: 700;
    color: #6E6E6E;

    .labels{
        display: flex;
    }

    .radioAttStatus{
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #D0DAED;
        border-radius: 3px;
        opacity: 1; 
        width: 100%;

        padding-left: 20px;

        .MuiFormControlLabel-root{
            width: fit-content;
        }

        .MuiTypography-root{
            font-family: 'Mulish';
            font-size: 15px;
            font-weight: 600;
        }
    }

    .selectMode{
        border: 2px solid #D0DAED;
        border-radius: 3px;

        font-family: 'Mulish';
        font-size: 15px;
        font-weight: 600;
        color: #6E6E6E;
    }

    .textFields{
        font-family: 'Mulish';
        font-size: 15px;
        color: #434343;
    }
`;

export const Label = styled.div`
    padding-top: 15px;
    padding-bottom: 5px;
`;