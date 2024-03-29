import styled from 'styled-components'

export const ProductCardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 350px;
    align-items: center;
    position: relative;

    button {
        width: 80%;
        opacity: 0.7;
        position: absolute;
        top: 255px;
        display: none;
    }

    &:hover {
        button {
            opacity: 0.85;
            display: flex;
        }
    }

    @media screen and (max-width: 800px) {
        width: 40vw;

        button {
            display: block;
            opacity: 0.9;
            min-width: unset;
            padding: 0 10px;

            &:hover {
                .img {
                    opacity: unset;
                }

                button {
                    opacity: unset;
                }
            }
        }
    }
`

export const ProductImage = styled.img`
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;

    &:hover {
        opacity: 0.8;
    }
`

export const Footer = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    font-size: 18px;

    @media screen and (max-width: 800px) {
        font-size: 14px;
    }
`

export const ProductName = styled.span`
    width: 90%;
    margin-bottom: 15px;

    @media screen and (max-width: 800px) {
        width: 80%;
    }
`

export const ProductPrice = styled.span`
    width: 10%;

    @media screen and (max-width: 800px) {
        width: 20%;
    }
`
