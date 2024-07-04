export async function get(key) {
  try {
    const value = await localStorage.getItem(key);

    return JSON.parse(value);
  } catch (e) {
    return false;
  }
}

export async function set(key, value) {
  try {
    await localStorage.setItem(key, JSON.stringify(value));

    return true;
  } catch (e) {
    console.log('Storage set error', e);

    return false;
  }
}

export async function remove(key) {
  try {
    await localStorage.removeItem(key);

    return true;
  } catch (e) {
    console.log('Storage remove error', e);

    return false;
  }
}
