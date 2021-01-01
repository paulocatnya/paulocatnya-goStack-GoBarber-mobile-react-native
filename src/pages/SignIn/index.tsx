import React, {useCallback,useRef} from 'react';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';


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
    const formRef = useRef<FormHandles>(null);

    const navigation = useNavigation();

    const handleSignIn = useCallback( (data:object) => {
        console.log('submit',data);}, [] );


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
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input
                                name="email"
                                icon="mail"
                                placeholder="Email" />

                            <Input 
                                name="password"
                                icon="lock"
                                placeholder="Senha" />

                        </Form>
                            
                        <Button 
                            onPress={() => {
                                formRef.current?.submitForm();
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


            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                <CreateAccountButtonText>
                    <Icon name="log-in" size={20} color="#ff9000" > </Icon>
                    Criar uma conta
                </CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}

export default SignIn;