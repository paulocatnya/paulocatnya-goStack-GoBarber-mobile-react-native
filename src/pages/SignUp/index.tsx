import React from 'react';
// import {Link} from 'react-router-dom';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import {useNavigation} from '@react-navigation/native';


import logoImg from '../../assets/logo.png';
import Button from '../../components/Button'
import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/Feather'

import {
    Container,
    Title,
    BackToSignIn,
    BackToSignInText
} from './styles';

const SignUp: React.FC = () => {
    const navigation = useNavigation();
    return (

        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container >
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Input
                            name="nome"
                            icon="user"
                            placeholder="Nome" />

                        <Input
                            name="email"
                            icon="mail"
                            placeholder="Email" />

                        <Input
                            name="password"
                            icon="lock"
                            placeholder="Senha" />

                        <Button
                            onPress={ () => {
                                console.log('pressionou')
                            }}>
                            Cadastrar
                        </Button>
                        <BackToSignIn onPress={() => navigation.goBack()}>
                            <BackToSignInText>
                                <Icon name="arrow-left" size={20} color="#fff" > </Icon>
                               Voltar para logon 
                            </BackToSignInText>
                        </BackToSignIn>
                    </Container>                
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}
export default SignUp;