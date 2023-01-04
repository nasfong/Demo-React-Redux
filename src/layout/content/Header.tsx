const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="content-header d-flex justify-content-center align-items-center px-5">
      <div className="">
        <span className="badge badge-primary">Typescript</span>
        <span className="badge badge-danger">Sass</span>
        <span className="badge badge-success">React-bootstrap + Bootstrap5</span>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Header
