export default {

    userForm(data) {

        if(data.value.length < data.min){
            data.error = `${data.min} 글자 이상 입력하세요.`;

        } else if(data.pattern.test(data.value) == false){
            data.error = '정규식 오류';

        } else {
            data.error = '';
            data.validated = true;
        }

        return data;
    },

}
