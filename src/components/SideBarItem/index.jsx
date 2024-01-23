import { SideBarItemStyle } from "./style";

export const SideBarItem = ({
  smallText,
  bigText,
  action,
  icon,
  index,
  value,
  sideBarCollapse,
}) => {
  return (
    <SideBarItemStyle collapse={sideBarCollapse}>
      <div
        tabIndex={index}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            action(value);
          }
        }}
      >
        <div className="acessibility-icons-label" onClick={() => action(value)}>
          {sideBarCollapse ? (
            <div
              className="item-container"
            >
              {icon}
              <span
                className="item-label"
              >
                {smallText}
              </span>
            </div>
          ) : (
            <>
              {icon}
              <span className="label-sidebar">{bigText}</span>
            </>
          )}
        </div>
      </div>
      </SideBarItemStyle>
  );
};
