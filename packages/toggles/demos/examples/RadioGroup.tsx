import { Radio } from '@ds/toggles';

export function RadioGroup() {
  return (
    <>
      <label htmlFor='delivery-courier'>
        <Radio id='delivery-courier' name='delivery' value='courier' defaultChecked /> Курьер
      </label>
      <label htmlFor='delivery-pickup'>
        <Radio id='delivery-pickup' name='delivery' value='pickup' /> Самовывоз
      </label>
      <label htmlFor='delivery-post'>
        <Radio id='delivery-post' name='delivery' value='post' /> Почта
      </label>
    </>
  );
}
