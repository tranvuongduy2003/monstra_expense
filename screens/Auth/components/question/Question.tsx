import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IQuestionProps {
  content: string;
  highlightedContent: string;
  onPressHighlight: () => void;
}

const Question: React.FunctionComponent<IQuestionProps> = ({
  content,
  highlightedContent,
  onPressHighlight,
}) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{content} </Text>
      <TouchableOpacity onPress={onPressHighlight}>
        <Text
          style={[
            styles.questionText,
            {color: AppColors.primaryColor, textDecorationLine: 'underline'},
          ]}>
          {highlightedContent}
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
