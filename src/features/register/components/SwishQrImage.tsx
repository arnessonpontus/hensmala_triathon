export const SwishQrImage = ({maxWidth = 250}: {maxWidth?: number | string}) => {
  return (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <img
      style={{maxWidth: maxWidth}}
      src="/images/qr_swish.svg"
      alt="Hensmala triathlon swish qr"
    />
  </div>
  )
}
