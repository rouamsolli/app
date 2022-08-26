import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { auth, database } from '../config'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import common from '@/Theme/Common'
import { Gutters } from '@/Theme/Gutters'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const navigation = useNavigation()

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={[Gutters.regularRMargin]} onPress={onSignOut}>
          <AntDesign
            name="logout"
            style={[Gutters.regularRMargin, common.botton.antdes]}
          />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe')
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      )
    })
    return unsubscribe
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0]
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    })
  }, [])

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      style={[common.button.secondary, common.button.textInput]}
      user={{
        _id: auth?.currentUser?.email,
      }}
    />
  )
}
