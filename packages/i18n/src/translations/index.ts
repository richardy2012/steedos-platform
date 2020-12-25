import * as _ from 'underscore';

export * from './objectTranslation';
export * from './templates/objectTranslation';


const getOption = function (option) {
    var foo;
    foo = option.split(":");
    if (foo.length > 1) {
        return {
            label: foo[0],
            value: foo[1]
        };
    } else {
        return {
            label: foo[0],
            value: foo[0]
        };
    }
};

export const convertObject = function (object: StringMap) {
    _.forEach(object.fields, function (field, key) {
        let _options = [];
        if (field.options && _.isString(field.options)) {
            try {
                //支持\n或者英文逗号分割,
                _.forEach(field.options.split("\n"), function (option) {
                    var options;
                    if (option.indexOf(",")) {
                        options = option.split(",");
                        return _.forEach(options, function (_option) {
                            return _options.push(getOption(_option));
                        });
                    } else {
                        return _options.push(getOption(option));
                    }
                });
                field.options = _options;
            } catch (error) {
                console.error("convertFieldsOptions error: ", field.options, error);
            }
        } else if (field.options && !_.isFunction(field.options) && !_.isArray(field.options) && _.isObject(field.options)) {
            _.each(field.options, function (v, k) {
                return _options.push({
                    label: v,
                    value: k
                });
            });
            field.options = _options;
        }
    })
}