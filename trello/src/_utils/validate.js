export default {

    value($data, callback){
        $data.validated = false;

        if($data.required == true && $data.value.length < 1){
            $data.error = `${$data.name}을(를) 작성해주세요.`;

        } else if($data.required == true && $data.validated == false){
            this.valid($data);

            if($data.required == true && $data.validated == true)
                return callback(true);
        }

        return callback($data);
    },

    object($data, callback){
        for(let key in $data){
            $data[key].validated = false;

            if($data[key].required == true && $data[key].value.length < 1){
                $data[key].error = `${$data[key].name}(을/를) 작성해주세요.`;

            } else if($data[key].required == true && $data[key].validated == false){
                this.valid($data[key]);
            }

        }

        return callback($data);
    },


    valid(data) {

        if(data.value.length < data.min){
            data.error = `${data.min} 글자 이상 입력하세요.`;
            data.validated = false;

        } else if(data.pattern && data.pattern.test(data.value) == false){
            data.error = `${data.name} 형식에 맞지 않습니다.`;
            data.validated = false;

        } else {
            data.error = '';
            data.validated = true;
        }

        return data;
    },

}
