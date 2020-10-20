import React from "react";
import { StyleSheet, Modal } from "react-native";

const DetailsModal = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (props.visible) {
      setIsVisible(true);
    }
    return () => {
      setIsVisible(false);
    };
  }, [props.visible]);

  return isVisible && <Modal>{props.children}</Modal>;
};

export default DetailsModal;

const styles = StyleSheet.create({});
