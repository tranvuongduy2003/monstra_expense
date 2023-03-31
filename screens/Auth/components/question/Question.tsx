import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IQuestionProps {
  content: string;
  highlightedContent: string;
}

const Question: React.FunctionComponent<IQuestionProps> = ({
  content,
  highlightedContent,
}) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>Already have an account? </Text>
      <TouchableOpacity>
        <Text
          style={[
            styles.questionText,
            {color: AppColors.primaryColor, textDecorationLine: 'underline'},
          ]}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 20,
  },
});

export default Question;
