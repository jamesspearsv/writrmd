type InputProps<T> = {
  controller?: {
    key: keyof T;
    value: T[keyof T];
    updateValue: (k: keyof T, v: T[keyof T]) => void;
  };
  name: string;
  label: string;
};

export default function Input<T>(props: InputProps<T>) {
  if (props.controller) {
    return (
      <>
        <label htmlFor={props.name}>{props.label}</label>
        <input
          type="text"
          name={props.name}
          id={props.name}
          value={props.controller.value as string}
          onChange={(e) => {
            if (props.controller) {
              props.controller.updateValue(
                props.controller.key,
                e.currentTarget.value as T[keyof T]
              );
            }
          }}
        />
      </>
    );
  } else {
    return (
      <>
        <label htmlFor={props.name}>{props.label}</label>
        <input type="text" name={props.name} id={props.name} />
      </>
    );
  }
}
