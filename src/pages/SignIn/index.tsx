import React from 'react';
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
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText
} from './styles';

const SignIn: React.FC = () => {
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
                        <View><Title>Faça seu logon</Title></View>
                        <Input
                            name="email"
                            icon="mail"
                            placeholder="Email" />

                        <Input
                            name="password"
                            icon="lock"
                            placeholder="Senha" />

                        <Button
                            onPress={() => {
                                console.log('pressionou')
                            }}>
                            Entrar
                        </Button>

                        <ForgotPassword onPress={() => { }}>
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>


            <CreateAccountButton onPress={() => navigation.navigate('SignUp') }>
                <CreateAccountButtonText>
                    <Icon name="log-in" size={20} color="#ff9000" > </Icon>
                    Criar uma conta
                </CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}

export default SignIn;